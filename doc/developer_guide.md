# Developer Guide

## Writing a Component

- For each Angular component (v17):
  - Use the Ionic framework and Angular Material if needed. Use the Moment class for dates.
  - Use `RxState` with providers: `[RxState]` in the `@Component(/*...*/, providers: [RxState])` declaration.
  - Just above each component class, declare a `MyComponentState` interface (replacing `MyComponent` with the name of the component):
    - Declare the dynamic properties of the component in this interface.
  - In the constructor:
    - Limit the parameters by using `injector: Injector` to facilitate inheritance.
    - Define all parameters with `protected` visibility.
  - In the component:
    - Add a `state` property with the `@RxStateRegister()` annotation:

      ```ts
      @RxStateRegister() protected state: RxState<MyComponentState> = inject(RxState);
      ```

    - For each dynamic attribute of the component:
      - Define the attribute with its simple type in the `MyComponentState` class.
      - In the component, define each property with the `@Input()` and `@RxStateProperty()` annotations:

        ```ts
        @Input() @RxStateProperty() attribute: string; 
        ```

        > For information, `@RxStateProperty()` will automatically generate code equivalent to:
        >
        > ```ts
        > @Input() set attribute(value: string) {
        >   this.state.set('attribute', () => value);
        > }
        > get attribute(): string {
        >   return this.state.get('attribute');
        > }
        > ```  

      - If needed, to observe a property, use the `@RxStateSelect()` annotation:

        ```ts
        @RxStateSelect() attribute$: Observable<string>; 
        ```

        > For information, `@RxStateSelect()` will automatically generate code equivalent to:
        >
        > ```ts
        > get attribute$(): Observable<string> {
        >   return this.state.select('attribute');
        > }
        > ```  

- For modals (if needed):
  - Use `IonicModal`.
  - Do not define the modal in the HTML template (inline) but in a separate component.
  - Manage the modal from the calling component via `ModalController`.

- For any generated code (by GPT or other):
  - Do not generate TypeScript imports.
  - Add a comment line at the top of the class indicating that the code is under a free license (GPL version 3), without writing the entire license.
