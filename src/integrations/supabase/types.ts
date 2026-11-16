export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          created_at: string
          details: Json
          entity_id: string | null
          entity_type: string
          id: string
        }
        Insert: {
          action: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type: string
          id?: string
        }
        Update: {
          action?: string
          actor_id?: string | null
          created_at?: string
          details?: Json
          entity_id?: string | null
          entity_type?: string
          id?: string
        }
        Relationships: []
      }
      fare_categories: {
        Row: {
          description: string | null
          id: string
          name: string
          status: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          status?: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          status?: string
        }
        Relationships: []
      }
      journey_credit_batches: {
        Row: {
          allocated_journeys: number
          created_at: string
          expires_at: string
          id: string
          remaining_journeys: number
          rollover_expires_at: string | null
          subscription_id: string
          user_id: string
        }
        Insert: {
          allocated_journeys: number
          created_at?: string
          expires_at: string
          id?: string
          remaining_journeys: number
          rollover_expires_at?: string | null
          subscription_id: string
          user_id: string
        }
        Update: {
          allocated_journeys?: number
          created_at?: string
          expires_at?: string
          id?: string
          remaining_journeys?: number
          rollover_expires_at?: string | null
          subscription_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "journey_credit_batches_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      journeys: {
        Row: {
          created_at: string
          credit_batch_id: string | null
          fare_kes: number | null
          id: string
          route_id: string | null
          status: string
          user_id: string
          vehicle_id: string | null
          verified_at: string | null
        }
        Insert: {
          created_at?: string
          credit_batch_id?: string | null
          fare_kes?: number | null
          id?: string
          route_id?: string | null
          status?: string
          user_id: string
          vehicle_id?: string | null
          verified_at?: string | null
        }
        Update: {
          created_at?: string
          credit_batch_id?: string | null
          fare_kes?: number | null
          id?: string
          route_id?: string | null
          status?: string
          user_id?: string
          vehicle_id?: string | null
          verified_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "journeys_credit_batch_id_fkey"
            columns: ["credit_batch_id"]
            isOneToOne: false
            referencedRelation: "journey_credit_batches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journeys_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "journeys_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      ledger_entries: {
        Row: {
          created_at: string
          credit_kes: number
          debit_kes: number
          entry_type: string
          id: string
          user_id: string
          wallet_transaction_id: string | null
        }
        Insert: {
          created_at?: string
          credit_kes?: number
          debit_kes?: number
          entry_type: string
          id?: string
          user_id: string
          wallet_transaction_id?: string | null
        }
        Update: {
          created_at?: string
          credit_kes?: number
          debit_kes?: number
          entry_type?: string
          id?: string
          user_id?: string
          wallet_transaction_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ledger_entries_wallet_transaction_id_fkey"
            columns: ["wallet_transaction_id"]
            isOneToOne: false
            referencedRelation: "wallet_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          body: string
          category: string
          created_at: string
          id: string
          read_at: string | null
          title: string
          user_id: string
        }
        Insert: {
          body: string
          category: string
          created_at?: string
          id?: string
          read_at?: string | null
          title: string
          user_id: string
        }
        Update: {
          body?: string
          category?: string
          created_at?: string
          id?: string
          read_at?: string | null
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      operator_accounts: {
        Row: {
          created_at: string
          display_name: string
          id: string
          owner_id: string
          sacco_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          owner_id: string
          sacco_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          owner_id?: string
          sacco_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "operator_accounts_sacco_id_fkey"
            columns: ["sacco_id"]
            isOneToOne: false
            referencedRelation: "sacco_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      operator_members: {
        Row: {
          created_at: string
          display_name: string
          id: string
          member_role: Database["public"]["Enums"]["operator_member_role"]
          operator_id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          member_role: Database["public"]["Enums"]["operator_member_role"]
          operator_id: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          member_role?: Database["public"]["Enums"]["operator_member_role"]
          operator_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "operator_members_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operator_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      operator_settlements: {
        Row: {
          amount_kes: number
          created_at: string
          currency: string
          id: string
          operator_id: string
          payout_reference: string | null
          period_end: string
          period_start: string
          status: string
        }
        Insert: {
          amount_kes: number
          created_at?: string
          currency?: string
          id?: string
          operator_id: string
          payout_reference?: string | null
          period_end: string
          period_start: string
          status?: string
        }
        Update: {
          amount_kes?: number
          created_at?: string
          currency?: string
          id?: string
          operator_id?: string
          payout_reference?: string | null
          period_end?: string
          period_start?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "operator_settlements_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operator_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      payment_transactions: {
        Row: {
          amount_kes: number
          created_at: string
          id: string
          provider: string
          provider_reference: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount_kes: number
          created_at?: string
          id?: string
          provider: string
          provider_reference?: string | null
          status: string
          user_id: string
        }
        Update: {
          amount_kes?: number
          created_at?: string
          id?: string
          provider?: string
          provider_reference?: string | null
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          phone_verified_at: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          phone_verified_at?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          phone_verified_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      refunds: {
        Row: {
          amount_kes: number
          created_at: string
          id: string
          payment_transaction_id: string | null
          reason: string | null
          status: string
          user_id: string
        }
        Insert: {
          amount_kes: number
          created_at?: string
          id?: string
          payment_transaction_id?: string | null
          reason?: string | null
          status?: string
          user_id: string
        }
        Update: {
          amount_kes?: number
          created_at?: string
          id?: string
          payment_transaction_id?: string | null
          reason?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "refunds_payment_transaction_id_fkey"
            columns: ["payment_transaction_id"]
            isOneToOne: false
            referencedRelation: "payment_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      route_stops: {
        Row: {
          id: string
          name: string
          route_id: string
          sequence_number: number
        }
        Insert: {
          id?: string
          name: string
          route_id: string
          sequence_number: number
        }
        Update: {
          id?: string
          name?: string
          route_id?: string
          sequence_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "route_stops_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      routes: {
        Row: {
          created_at: string
          destination: string
          id: string
          origin: string
          region: string
          short_code: string
          status: string
        }
        Insert: {
          created_at?: string
          destination: string
          id?: string
          origin: string
          region?: string
          short_code: string
          status?: string
        }
        Update: {
          created_at?: string
          destination?: string
          id?: string
          origin?: string
          region?: string
          short_code?: string
          status?: string
        }
        Relationships: []
      }
      sacco_accounts: {
        Row: {
          created_at: string
          display_name: string
          id: string
          registration_code: string | null
          status: string
        }
        Insert: {
          created_at?: string
          display_name: string
          id?: string
          registration_code?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          display_name?: string
          id?: string
          registration_code?: string | null
          status?: string
        }
        Relationships: []
      }
      subscription_plans: {
        Row: {
          created_at: string
          fare_category_id: string | null
          id: string
          journey_count: number
          name: string
          price_kes: number | null
          rollover_days: number
          route_id: string | null
          status: string
          validity_days: number
        }
        Insert: {
          created_at?: string
          fare_category_id?: string | null
          id?: string
          journey_count: number
          name: string
          price_kes?: number | null
          rollover_days?: number
          route_id?: string | null
          status?: string
          validity_days: number
        }
        Update: {
          created_at?: string
          fare_category_id?: string | null
          id?: string
          journey_count?: number
          name?: string
          price_kes?: number | null
          rollover_days?: number
          route_id?: string | null
          status?: string
          validity_days?: number
        }
        Relationships: [
          {
            foreignKeyName: "subscription_plans_fare_category_id_fkey"
            columns: ["fare_category_id"]
            isOneToOne: false
            referencedRelation: "fare_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscription_plans_route_id_fkey"
            columns: ["route_id"]
            isOneToOne: false
            referencedRelation: "routes"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          plan_id: string
          starts_at: string | null
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_id: string
          starts_at?: string | null
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          plan_id?: string
          starts_at?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_plan_id_fkey"
            columns: ["plan_id"]
            isOneToOne: false
            referencedRelation: "subscription_plans"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          created_at: string
          id: string
          message: string
          status: string
          subject: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          status?: string
          subject: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          status?: string
          subject?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      vehicles: {
        Row: {
          created_at: string
          id: string
          make_model: string | null
          operator_id: string
          registration_number: string
          sacco_id: string | null
          status: string
        }
        Insert: {
          created_at?: string
          id?: string
          make_model?: string | null
          operator_id: string
          registration_number: string
          sacco_id?: string | null
          status?: string
        }
        Update: {
          created_at?: string
          id?: string
          make_model?: string | null
          operator_id?: string
          registration_number?: string
          sacco_id?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_operator_id_fkey"
            columns: ["operator_id"]
            isOneToOne: false
            referencedRelation: "operator_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicles_sacco_id_fkey"
            columns: ["sacco_id"]
            isOneToOne: false
            referencedRelation: "sacco_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      wallet_accounts: {
        Row: {
          balance_kes: number
          created_at: string
          currency: string
          id: string
          status: string
          user_id: string
        }
        Insert: {
          balance_kes?: number
          created_at?: string
          currency?: string
          id?: string
          status?: string
          user_id: string
        }
        Update: {
          balance_kes?: number
          created_at?: string
          currency?: string
          id?: string
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount_kes: number
          created_at: string
          id: string
          provider_reference: string | null
          status: string
          transaction_type: string
          user_id: string
          wallet_id: string
        }
        Insert: {
          amount_kes: number
          created_at?: string
          id?: string
          provider_reference?: string | null
          status: string
          transaction_type: string
          user_id: string
          wallet_id: string
        }
        Update: {
          amount_kes?: number
          created_at?: string
          id?: string
          provider_reference?: string | null
          status?: string
          transaction_type?: string
          user_id?: string
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallet_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_assign_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _target_user_id: string
        }
        Returns: undefined
      }
      admin_create_route: {
        Args: {
          _destination: string
          _origin: string
          _region?: string
          _short_code: string
        }
        Returns: string
      }
      admin_create_subscription_plan: {
        Args: {
          _journey_count: number
          _name: string
          _price_kes: number
          _rollover_days?: number
          _route_id?: string
          _validity_days: number
        }
        Returns: string
      }
      admin_review_operator: {
        Args: { _operator_id: string; _status: string }
        Returns: undefined
      }
      admin_review_support_ticket: {
        Args: { _status: string; _ticket_id: string }
        Returns: undefined
      }
      admin_review_vehicle: {
        Args: { _status: string; _vehicle_id: string }
        Returns: undefined
      }
      admin_set_plan_status: {
        Args: { _plan_id: string; _status: string }
        Returns: undefined
      }
      admin_set_route_status: {
        Args: { _route_id: string; _status: string }
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      request_operator_account: {
        Args: { _display_name: string }
        Returns: string
      }
    }
    Enums: {
      app_role: "passenger" | "operator" | "conductor" | "admin"
      operator_member_role: "driver" | "conductor"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["passenger", "operator", "conductor", "admin"],
      operator_member_role: ["driver", "conductor"],
    },
  },
} as const
