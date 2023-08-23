import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: "./app.sqlite",
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: process.env.NODE_ENV != "production"
};

export const dataSource = new DataSource(dataSourceOptions);
dataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });