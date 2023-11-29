# Developer guide

## Writing a component

- Pour chaque composant Angular (v17):
  - Utiliser Ionic framework, et si besoin Angular Material. Utiliser la classe Moment pour les dates.
  - Utiliser `RxState` avec providers: `[RxState]` dans la déclaration `@Component(/*...*/, providers: [RxState])`.
  - Juste au-dessus de chaque classe composant, déclarer une interface `MonComponentState` (en remplaçant `MonComponent` par le nom du composant) :
    * Déclarer dans cette interface les propriétés dynamiques du composant.
  - Dans le constructeur :
    * Limiter les paramètres en utilisant injector: Injector pour faciliter l'héritage.
    * Définir tous les paramètres avec une visibilité protected.
  - Dans le composant : 
    - Ajouter une propriété `state` avec l'annotation `@RxStateRegister()`
      ```ts
      @RxStateRegister() protected state: RxState<MonComposantState> = inject(RxState);
      ```
    - Pour chaque attribut dynamique du composant :
      * Définir l'attribut avec son type simple dans la classe MonComposantState.
      * Dans le composant, définir chaque propriété avec les annotations `@Input()` et `@RxStateProperty()`
      ```ts
      @Input() @RxStateProperty() attribute: string; 
      ```
      > Pour information, `@RxStateProperty()` va générer automatiquement un code équivalent à :
      > ```ts
      > @Input() set attribute(value: string) {
      >   this.state.set('attribute', () => value);
      > }
      > get attribute(): string {
      >   return this.state.get('attribute');
      > }
      > ```  

      * Si besoin, pour observer une propriété, utiliser l'annotation `@RxStateSelect()`
      ```ts
      @RxStateSelect() attribute$: Observable<string>; 
      ```
      > Pour information, `@RxStateSelect()` va générer automatiquement un code équivalent à :
      > ```ts
      > get attribute$(): Observable<string> {
      >   return this.state.select('attribute');
      > }
      > ```  
  - Pour les modales (si besoin) :
    *  Utiliser IonicModal.
    *  Ne pas définir la modale dans le template HTML (inline) mais dans un composant séparé.
    *  Gérer la modale depuis le composant appelant via ModalController.
  - Pour tout code généré (par GPT ou autre) :
    - Ne pas générer les imports TypeScript.
    - Ajouter une ligne de commentaire, en entête de classe, indiquant que le code est sous licence libre (GPL version 3), sans toutefois écrire toute la license. 
