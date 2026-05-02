type SupabaseError = { message: string };
type SupabaseResult<T> = { data: T; error: SupabaseError | null };
type SupabaseRecord = { tenant_id?: string; id?: string; [key: string]: unknown };

class SupabaseQueryBuilder implements PromiseLike<SupabaseResult<unknown>> {
  select(...args: unknown[]): this { void args; return this; }
  eq(...args: unknown[]): this { void args; return this; }
  order(...args: unknown[]): this { void args; return this; }
  limit(...args: unknown[]): this { void args; return this; }
  maybeSingle(): Promise<SupabaseResult<SupabaseRecord | null>> { return Promise.resolve({ data: null, error: null }); }
  then<TResult1 = SupabaseResult<unknown>, TResult2 = never>(onfulfilled?: ((value: SupabaseResult<unknown>) => TResult1 | PromiseLike<TResult1>) | null,onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null): Promise<TResult1 | TResult2> {
    return Promise.resolve({ data: [], error: { message: "Supabase desativado no blueprint UI-only. Use adapters/mocks tipados." } }).then(onfulfilled ?? undefined, onrejected ?? undefined);
  }
}
class SupabaseUiOnlyStub {
  auth = {
    getUser: async (): Promise<SupabaseResult<{ user: { id: string } | null }>> => ({ data: { user: null }, error: null }),
    signInWithPassword: async (payload: unknown): Promise<SupabaseResult<null>> => { void payload; return { data: null, error: { message: "Login Supabase indisponível em modo UI-only." } }; },
    signOut: async (): Promise<SupabaseResult<null>> => ({ data: null, error: null }),
  };
  from(...args: unknown[]): SupabaseQueryBuilder { void args; return new SupabaseQueryBuilder(); }
  async rpc(...args: unknown[]): Promise<SupabaseResult<unknown>> { void args; return { data: null, error: { message: "RPC Supabase indisponível em modo UI-only." } }; }
}
export async function createClient() { return new SupabaseUiOnlyStub(); }
