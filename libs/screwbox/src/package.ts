/**
 * dream stack program metadata information from
 * the package.json
 *
 * @interface PlatformMetaData
 */
export interface PlatformMetaData {
  /**
   * the internal project name for the program
   *
   * @type {string}
   * @memberof PlatformMetaData
   */
  projectName: string;
  /**
   * the platfrom which the program was built
   *
   * @type {string}
   * @memberof PlatformMetaData
   */
  platform: string;
  /**
   * the account name for storing the secured keys for the program
   * in the installed os password storage
   *
   * @type {string}
   * @memberof PlatformMetaData
   */
  accountName: string;
}
