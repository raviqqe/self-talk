import * as sentry from "@sentry/browser";
import configuration from "../configuration.json";
import { IErrorReporter } from "./error-reporter";

export class SentryErrorReporter implements IErrorReporter {
  constructor() {
    sentry.init({ dsn: configuration.sentry.dsn });
  }

  public report(error: Error): void {
    sentry.captureException(error);
  }
}
