"""Qwen-powered LiveKit agent rendered through a Synthesia Interactive Avatar."""

import os
from pathlib import Path

from dotenv import load_dotenv
from livekit.agents import Agent, AgentSession, JobContext, WorkerOptions, cli, inference
from livekit.plugins import openai, silero, synthesia


load_dotenv(Path(__file__).resolve().parents[2] / ".env")

INSTRUCTIONS = (
    "You are Maya, a senior Australian marketing specialist at Common Ground Creative. "
    "Speak naturally and concisely. Ask one useful question at a time and help the caller "
    "build a practical Australian market-entry plan covering business, market, customers, "
    "strategy, budget, and campaign. Never mention implementation details or markdown."
)
# Jacqueline — a confident, young American adult female Cartesia voice.
DEFAULT_MAYA_VOICE_ID = "9626c31c-bec5-4cca-baa8-f8ba9e84c8bc"


def prewarm(proc) -> None:
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext) -> None:
    await ctx.connect()
    session = AgentSession(
        stt=inference.STT(model="cartesia/ink-2"),
        llm=openai.LLM(
            model=os.environ.get("DASHSCOPE_MODEL", "qwen-plus"),
            api_key=os.environ["DASHSCOPE_API_KEY"],
            base_url=os.environ["DASHSCOPE_BASE_URL"].rstrip("/"),
        ),
        tts=inference.TTS(
            model="cartesia/sonic-3.6",
            voice=os.environ.get("MAYA_TTS_VOICE_ID") or DEFAULT_MAYA_VOICE_ID,
            language="en",
        ),
        vad=ctx.proc.userdata["vad"],
    )
    avatar = synthesia.AvatarSession(
        synthesia.AvatarConfig(avatar_ids=[os.environ["SYNTHESIA_AVATAR_ID"]]),
        join_timeout=60.0,
    )
    await avatar.start(session, room=ctx.room)
    await session.start(agent=Agent(instructions=INSTRUCTIONS), room=ctx.room)
    session.generate_reply(instructions="Greet the caller and ask their Australian launch goal.")


if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            prewarm_fnc=prewarm,
            agent_name=os.environ.get("LIVEKIT_AGENT_NAME", "common-ground-maya"),
        )
    )
