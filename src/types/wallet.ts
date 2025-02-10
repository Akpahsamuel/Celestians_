export interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
  error: string | null;
}