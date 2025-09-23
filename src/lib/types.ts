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

export interface Event {
  user: string;
  type: string;
  ts: string;
  client_msg_id: string;
  text: string;
  team: string;
  blocks: Block[];
  channel: string;
  event_ts: string;
  channel_type: string;
}

export interface Block {
  type: string;
  block_id: string;
  elements: Element[];
}

export interface Element {
  type: string;
  elements: Element2[];
}

export interface Element2 {
  type: string;
  text: string;
}

export interface Authorization {
  // enterprise_id: any;
  team_id: string;
  user_id: string;
  is_bot: boolean;
  is_enterprise_install: boolean;
}
