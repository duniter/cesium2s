// import the required animation functions from the angular animations module
import {animate, state, style, transition, trigger} from '@angular/animations';

export const fadeInAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.3s', style({ opacity: 1 }))
        ]),
    ]);

export const fadeInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('fadeInOutAnimation', [

        // route 'enter' transition
        transition(':enter', [

            // css styles at start of transition
            style({ opacity: 0 }),

            // animation and styles at end of transition
            animate('.3s', style({ opacity: 1 }))
        ]),

        // route 'leave' transition
        transition(':leave', [
            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                opacity: 0
            }))
        ]),
    ]);

export const slideInOutAnimation =
    // trigger name for attaching this animation to an element using the [@triggerName] syntax
    trigger('slideInOutAnimation', [

        // end state styles for route container (host)
        state('*', style({
            // the view covers the whole screen with a semi tranparent background
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 1
        })),

        // route 'enter' transition
        transition(':enter', [

            // styles at start of transition
            style({
                // start with the content positioned off the right of the screen,
                // -400% is required instead of -100% because the negative position adds to the width of the element
                left: '400%',

                // start with background opacity set to 0 (invisible)
                opacity: 0
            }),

            // animation and styles at end of transition
            animate('.3s ease-in-out', style({
                // transition the right position to 0 which slides the content into view
                left: 0,

                // transition the background opacity to 0.8 to fade it in
                opacity: 0.8
            }))
        ]),

        // route 'leave' transition
        transition(':leave', [
            // animation and styles at end of transition
            animate('.5s ease-in-out', style({
                // transition the right position to -400% which slides the content out of view
                left: '400%',

                // transition the background opacity to 0 to fade it out
                opacity: 0
            }))
        ])
    ]);

export const slideUpDownAnimation =
  // trigger name for attaching this animation to an element using the [@triggerName] syntax
  trigger('slideUpDownAnimation', [

    // end state styles for route container (host)
    state('*', style({
      transform: 'translateY(0)',
      opacity: 1
    })),

    // route 'enter' transition
    transition(':enter', [

      // styles at start of transition
      style({
        transform: 'translateY(-400%)',
        opacity: 0
      }),

      // animation and styles at end of transition
      animate('.3s ease-in-out', style({
        transform: 'translateY(0)',
        opacity: 1
      }))
    ]),

    // route 'leave' transition
    transition(':leave', [
      // animation and styles at end of transition
      animate('.5s ease-in-out', style({
        transform: 'translateY(-100%)',
        opacity: 0
      }))
    ])
  ]);
