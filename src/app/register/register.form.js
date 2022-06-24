"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.RegisterForm = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var account_model_1 = require("../../services/model/account.model");
var referential_model_1 = require("../../services/model/referential.model");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var material_autocomplete_1 = require("../../../shared/material/autocomplete/material.autocomplete");
var environment_class_1 = require("../../../../environments/environment.class");
var RegisterForm = /** @class */ (function () {
    function RegisterForm(accountService, accountValidatorService, formBuilder, environment, settings) {
        var _this = this;
        this.accountService = accountService;
        this.accountValidatorService = accountValidatorService;
        this.formBuilder = formBuilder;
        this.environment = environment;
        this.settings = settings;
        this.debug = false;
        this.subscriptions = [];
        this.sending = false;
        this.showPwd = false;
        this.showConfirmPwd = false;
        this.onCancel = new core_1.EventEmitter();
        this.onSubmit = new core_1.EventEmitter();
        this.referentialToString = referential_model_1.referentialToString;
        this.forms = [];
        // Email form
        this.forms.push(formBuilder.group({
            email: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.email]), this.emailAvailability(this.accountService)),
            confirmEmail: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required, this.equalsValidator('email')]))
        }));
        // Password form
        this.forms.push(formBuilder.group({
            password: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(8)])),
            confirmPassword: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required, this.equalsValidator('password')]))
        }));
        // Detail form
        var formDetailDef = {
            lastName: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)])),
            firstName: new forms_1.FormControl(null, forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(2)]))
        };
        // Prepare autocomplete settings
        this.autocompleteHelper = new material_autocomplete_1.MatAutocompleteConfigHolder(settings && {
            getUserAttributes: function (a, b) { return settings.getFieldDisplayAttributes(a, b); }
        });
        // Add additional fields to details form
        this.additionalFields = this.accountService.additionalFields
            // Keep only required fields
            .filter(function (field) { return field.extra && field.extra.registration && field.extra.registration.required; });
        this.additionalFields.forEach(function (field) {
            //if (this.debug) console.debug("[register-form] Add additional field {" + field.name + "} to form", field);
            formDetailDef[field.key] = new forms_1.FormControl(null, _this.accountValidatorService.getValidators(field));
            if (field.type === 'entity') {
                field.autocomplete = _this.autocompleteHelper.add(field.key, field.autocomplete);
            }
        });
        this.forms.push(formBuilder.group(formDetailDef));
        this.form = formBuilder.group({
            emailStep: this.forms[0],
            passwordStep: this.forms[1],
            detailsStep: this.forms[2]
        });
    }
    RegisterForm.prototype.ngOnInit = function () {
        // For DEV only ------------------------
        if (!this.environment.production) {
            this.form.setValue({
                emailStep: {
                    email: 'contact@e-is.pro',
                    confirmEmail: 'contact@e-is.pro'
                },
                passwordStep: {
                    password: 'contactera',
                    confirmPassword: 'contactera'
                },
                detailsStep: {
                    lastName: 'Lavenier 2',
                    firstName: 'Benoit',
                    department: null
                }
            });
        }
    };
    Object.defineProperty(RegisterForm.prototype, "value", {
        get: function () {
            var result = {
                username: this.form.value.emailStep.email,
                password: this.form.value.passwordStep.password,
                account: new account_model_1.Account()
            };
            result.account.fromObject(this.form.value.detailsStep);
            result.account.email = result.username;
            return result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(RegisterForm.prototype, "valid", {
        get: function () {
            return this.form.valid;
        },
        enumerable: false,
        configurable: true
    });
    RegisterForm.prototype.isEnd = function () {
        return this.stepper.selectedIndex === 2;
    };
    RegisterForm.prototype.isBeginning = function () {
        return this.stepper.selectedIndex === 0;
    };
    RegisterForm.prototype.slidePrev = function () {
        return this.stepper.previous();
    };
    RegisterForm.prototype.slideNext = function (event) {
        if (event) {
            event.stopPropagation();
            event.preventDefault();
        }
        return this.stepper.next();
    };
    RegisterForm.prototype.equalsValidator = function (otherControlName) {
        return function (c) {
            if (c.parent && c.value !== c.parent.value[otherControlName]) {
                return {
                    equals: true
                };
            }
            return null;
        };
    };
    RegisterForm.prototype.emailAvailability = function (accountService) {
        return function (control) {
            return rxjs_1.timer(500).pipe(operators_1.mergeMap(function () { return accountService.checkEmailAvailable(control.value)
                .then(function (res) { return null; })["catch"](function (err) {
                console.error(err);
                return { availability: true };
            }); }));
        };
    };
    RegisterForm.prototype.cancel = function () {
        this.onCancel.emit();
    };
    RegisterForm.prototype.doSubmit = function (event) {
        if (this.form.invalid)
            return;
        this.sending = true;
        this.onSubmit.emit(this.value);
    };
    RegisterForm.prototype.markAsTouched = function () {
        this.form.markAsTouched();
    };
    RegisterForm.prototype.disable = function () {
        this.form.disable();
    };
    RegisterForm.prototype.enable = function () {
        this.form.enable();
    };
    __decorate([
        core_1.ViewChild('stepper', { static: true })
    ], RegisterForm.prototype, "stepper");
    __decorate([
        core_1.Output()
    ], RegisterForm.prototype, "onCancel");
    __decorate([
        core_1.Output()
    ], RegisterForm.prototype, "onSubmit");
    RegisterForm = __decorate([
        core_1.Component({
            selector: 'form-register',
            templateUrl: 'form-register.html',
            styleUrls: ['./form-register.scss']
        }),
        __param(3, core_1.Inject(environment_class_1.ENVIRONMENT))
    ], RegisterForm);
    return RegisterForm;
}());
exports.RegisterForm = RegisterForm;
