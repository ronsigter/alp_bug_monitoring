"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSessionIdsStore } from "../../store/useSessionIdsStore";

export function OnlyLatestSwitch() {
  const handleOnChange = (checked: boolean) => {
    useSessionIdsStore.setState({ latestOTA: checked });
  };

  return (
    <div className='flex items-center gap-2'>
      <Switch id='latest-ota' onCheckedChange={handleOnChange} />
      <Label htmlFor='latest-ota'>Latest Version Only</Label>
    </div>
  );
}
