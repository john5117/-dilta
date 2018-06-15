import * as Faked from '@dilta/generator';
import { KeysConfig } from '@dilta/commonwebui/src/dynamic-datagrid';

export namespace DynamicGrid {
  /**
   * base class for generating dynamic grid examples
   *
   * @export DynamicDataGridExampleBase
   * @class DynamicDataGridExampleBase
   * @template U datagrid item interface
   */
  export class DynamicDataGridExampleBase<U> {
    // unique identification for grid items
    public static tracker = 'id';

    // column keys and configuration for display
    // datagrid items to be displayed
    constructor(
      public keys: KeysConfig[],
      public datagrid: Array<U>,
      public express?: string
    ) {}

    // listens for click events sent to emit data clicked
    sender<T extends Event>($event: T) {}

    // listens for edited data events sent to the host
    changedData<T extends Event>($event: T) {}
  }

  /**
   * an grid example used to generate student report card
   *
   * @export
   * @class DynamicDataGridScoreExample
   * @extends {DynamicDataGridExampleBase<Faked.Score>}
   */
  export class DynamicDataGridScoreExample extends DynamicDataGridExampleBase<
    Faked.Score
  > {
    public static expres = 'total = fa + sa + exam';

    public static scoreConfig: KeysConfig[] = [
      { key: 'name', editable: false, type: 'string', send: true },
      {
        key: 'fa',
        editable: true,
        type: 'number',
        send: false,
        config: { max: 30, min: 0 }
      },
      {
        key: 'sa',
        editable: true,
        type: 'number',
        send: false,
        config: { max: 30, min: 0 }
      },
      {
        key: 'exam',
        editable: true,
        type: 'number',
        send: false,
        config: { max: 70, min: 0 }
      },
      { key: 'total', editable: true, type: 'number', send: false }
    ];

    constructor() {
      super(
        DynamicDataGridScoreExample.scoreConfig,
        Faked.examList(25),
        DynamicDataGridScoreExample.expres
      );
    }
  }

  /**
   * an grid example used to generate student report card
   *
   * @export
   * @class DynamicDataGridScoreExample
   * @extends {DynamicDataGridExampleBase<Faked.Score>}
   */
  export class DynamicDataGridResultExample extends DynamicDataGridExampleBase<
    Faked.Score
  > {
    public static config: KeysConfig[] = [
      { key: 'subject', editable: false, type: 'string', send: true },
      {
        key: 'fa',
        editable: true,
        type: 'number',
        send: false,
        config: { max: 30, min: 0 }
      },
      {
        key: 'sa',
        editable: true,
        type: 'number',
        send: false,
        config: { max: 30, min: 0 }
      },
      {
        key: 'exam',
        editable: true,
        type: 'number',
        send: false,
        config: { max: 70, min: 0 }
      },
      { key: 'total', editable: true, type: 'number', send: false }
    ];

    constructor() {
      super(
        DynamicDataGridResultExample.config,
        Faked.examList(25),
        DynamicDataGridScoreExample.expres
      );
    }
  }

  /**
   * a dynamic grid example used to display student biodatas
   *
   * @export
   * @class DynamicDataGridStudentExample
   * @extends {DynamicDataGridExampleBase<Faked.Student>}
   */
  export class DynamicDataGridStudentExample extends DynamicDataGridExampleBase<
    Faked.Student
  > {
    public static config: KeysConfig[] = [
      { key: 'name', editable: false, type: 'string', send: true },
      { key: 'age', editable: true, type: 'number' },
      { key: 'gender', editable: false, send: false, type: 'string' }
    ];

    constructor() {
      super(DynamicDataGridStudentExample.config, Faked.studentList(150));
    }
  }
}
