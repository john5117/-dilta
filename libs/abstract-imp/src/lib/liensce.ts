/**
 * Abstract class showing definations form operations reguarding
 * liensce key
 *
 * @export
 * @abstract
 * @class AbstractLiensce
 */
export abstract class AbstractLiensce {
  /**
   * method called to retrieve lience key
   *
   * @abstract
   * @memberof AbstractLiensce
   */
  abstract getLiensce(): void;
  /**
   * method called to update liensce key
   *
   * @abstract
   * @memberof AbstractLiensce
   */
  abstract updateLiensce<T>(key: T): void;
  /**
   * method called to delete liensce key
   *
   * @abstract
   * @memberof AbstractLiensce
   */
  abstract deleteLiensce(): void;
}
