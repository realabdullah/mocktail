# **mockTail 🪄**

🍸 Transform TypeScript type definitions into instant mock data using AI.

## **Overview**

mockTail 🪄 is a web-based tool that generates mock data from TypeScript type definitions using AI models (OpenAI or Google's Gemini). Simply paste your type definitions and get test data for your development workflow instantly.

## **Features**

### **🚀 AI-Powered Mock Data Generation**
- Choose between **OpenAI** or **Gemini** for mock data generation.  
- Type-safe output that follows your TypeScript definitions.

### **⚡ Instant Type Conversion**
- Paste your TypeScript types and get structured mock data **instantly**.  
- Supports **nested objects, arrays, enums, and optional properties**.

### **🗃️ History Management (New!)**
- **Autosave** generated mock data for future reference.  
- **Trash System**: Deleted mock data is **soft-deleted** and moved to a **trash bin** instead of being lost forever.  
- **Restore Deleted Items**: Accidentally deleted something? Restore it back to history.  
- **Permanent Deletion**: Clean up by removing items from the trash **forever**.

### **🌳 JSON Tree Viewer (New!)**
- View your generated JSON data in a **collapsible tree** format.  
- Expand/collapse nested objects and arrays for better readability.

### **💾 Download JSON**
- Quickly **download** the generated JSON to use in your projects.

### **🖥️ Browser-Based Convenience**
- No installation required – **works directly in your browser**.  
- **Copy to Clipboard**: One-click copy of mock data to use in your project.

---

## **Example Usage**

1. **Enter Your API Key**: Provide your OpenAI or Google Gemini API key in the designated field.
2. **Paste a Type Definition**: For instance:
   ```ts
   interface UserProfile {
     id: string;
     username: string;
     age: number;
     email: string;
     hobbies: string[];
   }
   ```
3. **Select an AI Model** (OpenAI or Gemini) to generate your data.
4. **Click "Generate"** to instantly receive valid, realistic mock data:
   ```json
   {
     "id": "123e4567-e89b-12d3-a456-426614174000",
     "username": "johndoe",
     "age": 25,
     "email": "johndoe@example.com",
     "hobbies": ["gaming", "hiking"]
   }
   ```
5. Use the **JSON Tree Viewer** to inspect and expand nested structures.
6. **Copy** or **Download** the JSON for direct use in your code.
7. Manage previous generations in **History**, restore from **Trash**, or delete permanently.

---

## **How the History & Trash System Works**

1. Every mock data generation **automatically saves** to history.  
2. If you delete an item, it moves to the **Trash** instead of being lost forever.  
3. Items in Trash can be:
   - **Restored** back to history.
   - **Deleted permanently** if no longer needed.

This ensures **no accidental loss** of important mock data while keeping your workspace clean.

---

## **Setup**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/realabdullah/mocktail.git
   cd mocktail
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open** [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Contributing**

Contributions are welome! If you have ideas for improvements, feel free to open an issue or submit a pull request.
