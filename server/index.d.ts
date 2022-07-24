interface Dispatcher {
  src: number;
  number: string
}

interface IncomingCallerCtx {
  source: number;
  number: string;
  name: string;
}

interface OnCallExportCtx {
  incomingCaller: IncomingCallerCtx; // incoming caller context
  exit: () => void; // Exits the phone call for the caller
  next: () => void; // Allows the number to ring out to the default handler
  reply: (msg: string) => void; // Sends a text message to the caller
  forward: (tgt: string) => void; // Forwards the call to a new number
}

interface OnMessageExportCtx {
  data: PreDBMessage;

  source: number;
}

interface PreDBMessage {
  conversationId: string;
  tgtPhoneNumber: string;
  message: string;
}