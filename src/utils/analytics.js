/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
// @flow

/**
 * Document Google Analytics API that is used in the project. These definitions
 * can be updated as more features are used.
 *
 * https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
 */
type GAEvent = {|
  hitType: 'event',
  // Specifies the event category. Must not be empty
  eventCategory: string,
  eventAction: string,
  eventLabel?: string,
  eventValue?: number,
|};

type GAPageView = {|
  hitType: 'pageview',
  page: string,
|};

type GATiming = {|
  hitType: 'timing',
  timingCategory: string,
  timingVar: string,
  timingValue: number,
  timingLabel?: string,
|};

export type GAPayload = GAEvent | GAPageView | GATiming;

export type GAErrorPayload = {|
  +exDescription: string,
  +exFatal: boolean,
|};

// Prettier breaks with multiple arrow functions and intersections, so name the arrow
// functions.
type _Send = ('send', GAPayload) => void;
type _Exception = ('send', 'exception', GAErrorPayload) => void;
export type GoogleAnalytics = _Send & _Exception;

export function sendAnalytics(payload: GAPayload) {
  const ga: ?GoogleAnalytics = self.ga;
  if (ga) {
    ga('send', payload);
  }
}

export function reportError(errorPayload: GAErrorPayload) {
  const ga: ?GoogleAnalytics = self.ga;
  if (ga) {
    ga('send', 'exception', errorPayload);
  }
}
