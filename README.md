# Intro

A simple reporting dashboard built with **React**, **Redux Toolkit**, **@tanstack/react-query**, **@tanstack/react-virtual** and **Mantine**.  
The app demonstrates filtering, data fetching, virtualization, and chart visualizations.

## 🚀 How to Run

1. **Clone the repository**

    ```bash
    git clone <repo-url>
    cd <repo-url>
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Set up environment variables
    - Copy the `.env.template` file to `.env`
    - Update the values of `VITE_API_KEY` and `VITE_API_SECRET` with the correct credentials.

    ```bash
    cp .env.template .env
    ```

    These values will be used to authenticate API requests.

4. Start development server

    ```bash
    npm run dev
    ```

    The app will be available at https://localhost:5173.

---

### 📌 Assumptions

- A real REST API endpoint is expected to be available for fetching report data.
- Authentication is handled with `apiKey` and `apiSecret` stored in `.env` file. In a real-world application, this would more likely be managed through OAuth2 or SSO, with tokens issued and refreshed automatically by the identity provider.
- For this exercise, it is assumed that the generated token does not expire. In production, token refresh flows would need to be implemented to handle expiration
- Filtering (dates, users, activities) is handled client-side in this mock setup. In production, filtering and pagination would typically be done server-side for performance and scalability.
- The UI is optimized for desktop use only (minimum screen limit of 1200px).

### ✨ What I Would Do With More Time

- **Full authentication flow**  
  Implement secure OAuth2 or SSO authentication and refresh logic for expiring tokens.

- **Server-driven pagination and filters**  
  Replace client-side filtering with API-driven filters and pagination to handle large datasets efficiently.

- **Error handling**  
  Show clear error states in the UI (invalid credentials, expired tokens, or network failures).

- **Testing**  
  Add unit tests for reducers and components, plus integration tests for filters, table virtualization, and API calls.

- **Feature upgrades**  
  Instead of adding more visualizations, I would focus on upgrading existing features.  
  For example, the current bar chart could be updated to support **calendar-based views** (weekly or monthly aggregations), similar to how the existing system presents its reports.  
  I;d also update the table to **allow sorting per column** and most probably use Ag-Grid or Ignte UI.  
  In addition, users could **create, update, and delete time entries**, making the dashboard not only a reporting tool but also an interactive time management system.  
  Finally, I would add the ability to **export reports as CSV/XLSXX/PDF**, similar to the existing system.

- **User engagement improvements**  
  Leverage the data returned from `/api/v4/report` to create more meaningful engagement.  
  For example, highlight or even automate repeated time entries or activities or engagements(?), and provide suggestions or insights to help users optimize their workflows.  
  This would definitely be a cool feature and a challenging one.

- **Accessibility**  
  Improve ARIA support, keyboard navigation, and screen reader compatibility. Add features to switching of theme (dark and light) and localization support for multiple languages.
