const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      const fs = require("fs-extra");
      const pg = require("pg");
      const path = require("path");
      //xx conexion a BD version 2
      on("task", {
        DATABASE2: async ({ dbConfig, queries }) => {
          const pool = new pg.Pool(dbConfig);
          const results = {};

          try {
            for (const { label, sql, values } of queries) {
              const result = await pool.query(sql, values);
              results[label] = result.rows;
            }

            return results;
          } catch (error) {
            console.error("Error en la consulta a la base de datos:", error);
            throw error;
          } finally {
            await pool.end();
          }
        },
      });

      function getConfigurationByFile(env) {
        const pathToConfigFile = path.resolve("cypress/BD", `${env}.config.json`);

        return fs.readJson(pathToConfigFile);
      }

      //if no environment is provided, then QA env will be default
      const env = config.env.configFile || "qa";
      return getConfigurationByFile(env);
    },
  },
  fixturesFolder: "cypress/e2e/",
});
