

```markdown
## Contributing

Thank you for considering contributing to the **KHC** project! 🚀 Follow these steps to set up the project on your local machine.

### Installation

1. **Clone the repository**  
   Clone the project to your local machine using the following command:  
   ```bash
   git clone https://github.com/sudoarchie/khc.git
   cd khc
   ```

2. **Install dependencies**  
   Use `pnpm` to install the required dependencies:  
   ```bash
   pnpm install
   ```

3. **Generate Prisma client**  
   Generate the Prisma client using the schema located at `./prisma/schema`:  
   ```bash
   npx prisma generate ./prisma/schema
   ```

4. **Compile TypeScript**  
   Build the TypeScript files:  
   ```bash
   tsc -b
   ```

5. **Start the development server**  
   Run the project in development mode:  
   ```bash
   npm run dev
   ```

### Notes
- Ensure you have `pnpm`, `npx`, and `npm` installed globally on your system.
- Verify that the database configuration in the `prisma/schema` file is set up correctly.

Happy coding! 😊
```
