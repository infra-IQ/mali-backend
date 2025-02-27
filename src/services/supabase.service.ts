import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL || "",
  process.env.SUPABASE_PUBLIC_KEY || "",
  {
    global: {
      fetch: (...args) => fetch(...args),
    },
  }
);

export default supabase;

interface OrderData {
  userId: string;
  items: Array<{ productId: string; quantity: number }>;
  totalAmount: number;
  orderDate: string;
  created: string;
  status: string;
}

interface MessageData {
  conversation_id: string;
  user_id: string;
  content: string;
  timestamp: string;
  role: "user" | "assistant";
}

export async function saveOrder(orderData: OrderData) {
  const { data, error } = await supabase.from("orders").insert([orderData]);

  if (error) {
    console.error("Error saving order:", error);
    throw error;
  }
  return data;
}

export async function saveMessage(messageData: MessageData) {
  const { data, error } = await supabase.from("messages").insert([messageData]);

  if (error) {
    console.error("Error saving message:", error);
    throw error;
  }
  return data;
}

export async function getMessages(conversationId: string) {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("conversation_id", conversationId);

  if (error) {
    console.error("Error getting messages:", error);
    throw error;
  }
  return data;
}

export async function createConversation(
  conversationId: string,
  userId: string
) {
  const { data, error } = await supabase
    .from("conversations")
    .insert([{ id: conversationId, user_id: userId }])
    .select()
    .single();

  return data;
}

// if not exsit only create user
export async function createUser(userId: string) {
  // Check if the user already exists
  const { data: existingUser, error: selectError } = await supabase
    .from("users")
    .select("id")
    .eq("id", userId)
    .single();

  if (existingUser) {
    return existingUser;
  }

  const { data, error: insertError } = await supabase
    .from("users")
    .insert([{ id: userId }])
    .select()
    .single();

  if (insertError) {
    console.error("Error creating user:", insertError);
  }

  return data;
}
