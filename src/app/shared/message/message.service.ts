import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MessageContainerComponent} from './message-container/message-container.component';
import {MatSnackBarRef} from '@angular/material/snack-bar/typings/snack-bar-ref';
import {MessageOptions} from './message-options';
import {Message} from './message';

@Injectable()
export class MessageService {

  constructor(private snackBar: MatSnackBar) {
  }

  private prompt(icon: string,
                 context: string,
                 content: string, options?: number | MessageOptions): MatSnackBarRef<MessageContainerComponent> {
    if (typeof options === 'number') {
      options = {duration: options};
    }
    options = Object.assign({panelClass: 's-snack-bar-container'}, options);
    return this.snackBar.openFromComponent(MessageContainerComponent, {
      data: {icon, context, content} as Message,
      ...options
    });
  }

  success(content: string, options?: number | MessageOptions): MatSnackBarRef<MessageContainerComponent> {
    return this.prompt('check_circle', 'success', content, options);
  }

  error(content: string, options?: number | MessageOptions): MatSnackBarRef<MessageContainerComponent> {
    return this.prompt('error', 'error', content, options);
  }

  info(content: string, options?: number | MessageOptions): MatSnackBarRef<MessageContainerComponent> {
    return this.prompt('info', 'info', content, options);
  }

  warning(content: string, options?: number | MessageOptions): MatSnackBarRef<MessageContainerComponent> {
    return this.prompt('warning', 'warning', content, options);
  }

}
