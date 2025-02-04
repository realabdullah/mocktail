# mockTail 🪄

🍸 Transform TypeScript type definitions into instant mock data using AI.

## Overview

mockTail 🪄 is a web-based tool that generates mock data from TypeScript type definitions using AI models (OpenAI or Google's Gemini). Simply paste your type definitions, and get test data for your development workflow instantly.

## Features

- **AI-Powered Generation**: Choose between OpenAI or Gemini for mock data generation
- **Instant Type Conversion**: Paste your TypeScript types and get mock data immediately
- **Browser-Based**: No installation required - works directly in your web browser
- **Type-Safe Output**: Generated mock data that follows your type definitions
- **Copy to Clipboard**: Easily copy the generated mock data to use in your projects

## Setup

1. Clone the repository:
```bash
git clone https://github.com/realabdullah/mocktail.git
cd mocktail
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Visit the web app
2. Select AI agent to use
3. Add API key
4. Paste your TypeScript type definition
5. Click "Generate Mock Data"
6. Get your mock data

Example:

```typescript
// Input type
type User = {
  name: string;
  age: number;
  email: string;
  isActive: boolean;
}[];

// Generated output
[
  {
    "name": "John Doe",
    "age": 28,
    "email": "john.doe@example.com",
    "isActive": true
  },
  {
    "name": "Jane Smith",
    "age": 32,
    "email": "jane.smith@example.com",
    "isActive": false
  }
]
```

---

Built by [ABD](https://abdspace.xyz)