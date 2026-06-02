import { SettingsPanel } from "@/features/text-to-speech/components/settings-panel";
import { TextInputPanel } from "@/features/text-to-speech/components/text-input-panel";
import { VoicePreviewPlaceholder } from "@/features/text-to-speech/components/voice-preview-placeholder";

export default function TextToSpeechView() {
  return (
    <>
      <div className="flex flex-1 min-h-0 overflow-hidden">
        <div className="flex flex-1 min-h-0 flex-col">
          <TextInputPanel />
          <VoicePreviewPlaceholder />
        </div>
        <SettingsPanel />
      </div>
    </>
  );
}
