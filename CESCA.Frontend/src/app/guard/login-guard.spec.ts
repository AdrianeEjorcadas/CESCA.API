import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { provideHttpClientTesting } from '@angular/common/http/testing';


import { loginGuard } from './login-guard';
import { AuthService } from '../services/auth-service';
import { Router } from '@angular/router';

import {} from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('loginGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => loginGuard(...guardParameters));

  beforeEach(() => {
    authService = jasmine.createSpyObj('AuthService', ['isAuthenticated']);
    router = jasmine.createSpyObj('Router', ['parseUrl']);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authService },
        { provide: Router, useValue: router }
      ]
    });
  });

  it('should allow navigation if not authenticated', () => {
    authService.isAuthenticated.and.returnValue(false);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBeTrue();
  });

  it('should redirect to dashboard if authenticated', () => {
    const fakeUrlTree = {} as any;
    authService.isAuthenticated.and.returnValue(true);
    router.parseUrl.and.returnValue(fakeUrlTree);

    const result = executeGuard({} as any, {} as any);

    expect(result).toBe(fakeUrlTree);
    expect(router.parseUrl).toHaveBeenCalledWith('/dashboard');
  });
});

