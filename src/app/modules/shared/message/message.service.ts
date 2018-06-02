import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MatSnackBarRef} from '@angular/material/snack-bar/typings/snack-bar-ref';
import {MessageOptions} from './message-options';
import {Message} from './message';
import {MessageComponent} from './message.component';

@Injectable()
export class MessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  private prompt(
    icon: string,
    context: string,
    content: string | string[],
    options?: number | MessageOptions
  ): MatSnackBarRef<MessageComponent> {
    if (typeof options === 'number') {
      options = {duration: options};
    }
    return this.snackBar.openFromComponent(MessageComponent, {
      panelClass: 's-message-container',
      data: {icon, context, messages: Array.isArray(content) ? content : [content]} as Message,
      ...options
    });
  }

  success(content: string | string[], options?: number | MessageOptions): MatSnackBarRef<MessageComponent> {
    return this.prompt('check_circle', '#28a745', content, options);
  }

  error(content: string | string[], options?: number | MessageOptions): MatSnackBarRef<MessageComponent> {
    return this.prompt('error', '#dc3545', content, options);
  }

  info(content: string | string[], options?: number | MessageOptions): MatSnackBarRef<MessageComponent> {
    return this.prompt('info', '#17a2b8', content, options);
  }

  warning(content: string | string[], options?: number | MessageOptions): MatSnackBarRef<MessageComponent> {
    return this.prompt('warning', '#ffc107', content, options);
  }

}
