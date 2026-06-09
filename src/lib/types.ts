// generated types from response
export interface IncomingPayload {
  token: string;
  team_id: string;
  context_team_id: string;
  // context_enterprise_id: any;
  api_app_id: string;
  event: Event;
  type: string;
  event_id: string;
  event_time: number;
  authorizations: Authorization[];
  is_ext_shared_channel: boolean;
  event_context: string;
}

interface Event {
  user: string;
  type: string;
  // Present on non-user messages such as the bot's own replies, edits, and
  // deletions (e.g. "bot_message", "message_changed", "message_deleted").
  subtype?: string;
  // Set when the message was posted by a bot/app (including this app itself).
  bot_id?: string;
  app_id?: string;
  ts: string;
  client_msg_id: string;
  text: string;
  team: string;
  blocks: Block[];
  channel: string;
  event_ts: string;
  channel_type: string;
}

interface Block {
  type: string;
  block_id: string;
  elements: Element[];
}

interface Element {
  type: string;
  elements: Element2[];
}

interface Element2 {
  type: string;
  text: string;
}

interface Authorization {
  // enterprise_id: any;
  team_id: string;
  user_id: string;
  is_bot: boolean;
  is_enterprise_install: boolean;
}
