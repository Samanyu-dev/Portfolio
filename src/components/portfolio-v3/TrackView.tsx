"use client";
import { useEffect } from "react";
import { track } from "@/lib/track";
export default function TrackView({ type, id }: { type: string; id: string }) {
  useEffect(() => { track(type, id); }, [type, id]);
  return null;
}
