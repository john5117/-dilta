import * as Faked from '@dilta/generator';
import { KeysConfig } from '@dilta/commonwebui/src/dynamic-datagrid';

export namespace Utils {
  /**
   * ExampleUtils contains most used attributes and genric functions
   *
   * @export
   * @class ExampleUtils
   */
  export class ExampleUtils {
    // authorization levels
    public static levels = Faked.levels;

    //  classes available for users
    public static classes = Faked.classes;

    // subjects available for users
    public static subjects = Faked.subjects;

    //  sessions available
    public static sessions = Faked.sessions;

    // terms available
    public static terms = Faked.terms;

    // return a single student object
    public static student = Faked.student();

    // return a single school object
    public static school = Faked.school();

    // return a single parent object
    public static parent = Faked.parent();

    // return a single teacher object
    public static teacher = Faked.teacher();

    // return a single err message
    public static err = `an an error message`;

    public static bindEmitter<T extends Event>($event: T) {}
  }

  /**
   * ReceiptEditorComponent example generator
   *
   * @export
   * @class ReceiptEditorComponentExample
   */
  export class ReceiptEditorComponentExample {
    public static teacher = ExampleUtils.teacher;

    public static sessionList = ExampleUtils.sessions;

    public static termsList = ExampleUtils.terms;

    evntEmitter<T extends Event>($event: T) {}
  }
}
