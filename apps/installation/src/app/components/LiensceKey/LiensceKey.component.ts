import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { tap, switchMap } from 'rxjs/operators';
import { to } from 'await-to-js';
import {
  UploadOutput,
  UploadInput,
  UploadFile,
  humanizeBytes,
  UploaderOptions
} from 'ngx-uploader';

import { reader } from '@dilta/screwbox';
import { LoggerService } from '@dilta/util';

import {
  ProcessReducer,
  VerifyLiensceKey,
  processFeature
} from '@dilta/process';
import { Auth } from '@dilta/models';
import { EntityServiceFactory } from 'ngrx-data';

/**
 * ui for selecting the liensce key for the app
 *
 * @export
 * @class LiensceKeyComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-liensce-key',
  templateUrl: './LiensceKey.component.html',
  styleUrls: ['./LiensceKey.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LiensceKeyComponent implements OnInit, OnDestroy {
  public logo = '/assets/logo.svg';

  public uploadOptions = {};
  /**
   * holds an err displayed to the view
   *
   * @type {string}
   * @memberof LiensceKeyComponent
   */
  public err: string;

  /**
   * holds and display the liensce key path
   *
   * @type {string}
   * @memberof LiensceKeyComponent
   */
  public path: string;

  /**
   * holds the read lienscekey
   *
   * @public
   * @type {string}
   * @memberof LiensceKeyComponent
   */
  public key: string;

  constructor(
    private store: Store<ProcessReducer>,
    private log: LoggerService,
    private router: Router
  ) {}

  /**
   * fil(event)
   * @param event an uploading event containing
   * image file to be uploaded
   */
  async fil(event) {
    const evnt: File = event ? event.nativeFile : undefined;
    const [err, key] = await to<string, Error>(reader(evnt, 'readAsText'));
    this.path = evnt.path;
    this.displayError(err);
    this.key = key;
  }

  /**
   * displays an error to the user
   *
   * @param {Error} err
   * @memberof LiensceKeyComponent
   */
  displayError(err: Error) {
    if (!err) {
      return;
    }
    setTimeout(() => {
      this.err = null;
      this.key = null;
    }, 3000);
    this.err = err.message;
  }

  /**
   * verifys the the key
   *
   * @param {string} key liensce key string test
   * @memberof LiensceKeyComponent
   */
  verify(key: string) {
    this.store.dispatch(new VerifyLiensceKey(key));
  }

  /**
   * navigates to the page and setup school details
   *
   * @param {string} schoolId the school id
   * @memberof LiensceKeyComponent
   */
  setupSchoolDetails(schoolId: string) {
    if (!schoolId) {
      return;
    }
    // schoolId
    this.router.navigateByUrl(`school/${schoolId}`);
  }

  ngOnInit() {
    this.store.select(processFeature).subscribe(store => {
      console.log({ store });
      if (store.error) {
        return this.displayError(new Error(store.error));
      }
      this.setupSchoolDetails(store.schoolId);
    });
  }

  /**
   * ends the subscription of the listener events
   *
   * @memberof LiensceKeyComponent
   */
  ngOnDestroy() {}
}