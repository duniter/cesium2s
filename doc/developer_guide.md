# Developer guide

## Writing a component

- Pour chaque composant Angular (v14):
  - Utiliser Ionic framework, et si besoin Angular Material. Utiliser la classe Moment pour les dates.
  - Utiliser RxState avec providers: [RxState] dans la déclaration @Component.
  - Juste au-dessus de chaque classe composant, déclarer une interface MonComponentState :
    * En remplaçant "MonComponent" par le nom du composant.
    * Ajouter les attributs dynamiques du composant dans cette interface.
  - Dans le constructeur :
    * Limiter les paramètres en utilisant injector: Injector pour faciliter l'héritage.
    * Définir tous les paramètres avec une visibilité protected.
    * Ajouter un paramètre state: RxState<MonComposantState>.
  - Pour chaque attribut dynamique du composant :
    * Définir l'attribut avec son type simple dans la classe MonComposantState.
    * Dans le composant, définir un getter et un setter avec @Input qui utilise state :
    ```ts
    get attribute(): string {
      return this.state.get('attribute');
    }
    @Input() set attribute(value: string) {
      this.state.set('attribute', () => value);
    }
    ```    
  - Pour les modales (si besoin) :
    *  Utiliser IonicModal.
    *  Ne pas définir la modale dans le template HTML (inline) mais dans un composant séparé.
    *  Gérer la modale depuis le composant appelant via ModalController.
  - Ne pas générer les imports TypeScript.
