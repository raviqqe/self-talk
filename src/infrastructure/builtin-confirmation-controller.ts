export class BuiltinConfirmationController {
  public confirm(message: string): Promise<boolean> {
    return Promise.resolve(window.confirm(message));
  }
}
