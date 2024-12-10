import {
  percentAmount,
  generateSigner,
  signerIdentity,
  createSignerFromKeypair,
} from "@metaplex-foundation/umi";
import {
  TokenStandard,
  createAndMint,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
// change your wallet here
import secret from "tushar.json";

(async () => {
  try {
    console.log("Connecting to Solana mainnet...");
    const umi = createUmi("https://api.devnet.solana.com"); // Replace with your RPC Endpoint
    console.log("Successfully connected.");

    console.log("Creating wallet from secret key...");

    const userWallet = umi.eddsa.createKeypairFromSecretKey(
      new Uint8Array(secret),
    );
    console.log("Wallet public key:", userWallet.publicKey.toString());

    const userWalletSigner = createSignerFromKeypair(umi, userWallet);

    const metadata = {
      name: "TRN",
      symbol: "TRN",
      uri: "https://raw.githubusercontent.com/himan9192393/solana/refs/heads/main/metadata_tushar.json",
    };

    console.log("Generating new mint account...");
    const mint = generateSigner(umi);
    console.log("Mint account public key:", mint.publicKey.toString());

    console.log("Setting wallet identity...");
    umi.use(signerIdentity(userWalletSigner));

    console.log("Initializing Token Metadata plugin...");
    umi.use(mplTokenMetadata());

    console.log("Starting minting process...");
    await createAndMint(umi, {
      mint,
      authority: umi.identity,
      name: metadata.name,
      symbol: metadata.symbol,
      uri: metadata.uri,
      sellerFeeBasisPoints: percentAmount(0),
      decimals: 6,
      amount: 100_000_000_000000,
      tokenOwner: userWallet.publicKey,
      tokenStandard: TokenStandard.Fungible,
    }).sendAndConfirm(umi);

    console.log(
      "✅ Successfully minted 100 million tokens!",
      "Mint Public Key:",
      mint.publicKey.toString(),
    );
  } catch (err) {
    console.error("❌ Error during minting process:", err);
  }
})();
