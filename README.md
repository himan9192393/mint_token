1) npm install
2) npm install ts-node
3) create a new keypair using solana keygen :- "solana-keygen new --outfile example.json
4) In code change the name and symbol in metadata array
5) Upload a image to github and copy its raw link
6) This is metadata.json format :-
   {
    "name": "LQNA",
    "symbol": "LQNA",
    "description": "This is the best token ever of hyperrr!",
    "image": "paste-your-image-lin"
}
7) now copy this metadata.json file link and paste it into uri section in the singlemint.ts
8) Now change the secret variable from tushar.json to example.json
9) ts-node singlemint.ts
