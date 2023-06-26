import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginFormComponent } from './login-form.component';
import { NgForm } from '@angular/forms';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should log the user in and set the token cookie on successful login', async () => {
    // Mock a successful response with a token
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ token: 'dummy-token' }),
      }) as Promise<Response>
    );

    const myForm: NgForm = {
      form: {
        value: {
          email: 'test@example.com',
          password: 'test123',
        },
      },
    } as NgForm;

    await component.onSubmit(myForm);

    // Verify that the token cookie is set with the correct value
    const tokenCookie = getCookie('token');
    expect(tokenCookie).toBe('dummy-token');

    // Verify that the isLogged flag is set to true
    expect(component.isLogged).toBe(true);
  });

  it('should display error message on unsuccessful login', async () => {
    // Mock an unsuccessful response with an error message
    spyOn(window, 'fetch').and.returnValue(
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: 'Invalid credentials' }),
      }) as Promise<Response>
    );

    spyOn(window, 'alert');

    const myForm: NgForm = {
      form: {
        value: {
          email: 'test@example.com',
          password: 'test123',
        },
      },
    } as NgForm;

    await component.onSubmit(myForm);

    // Verify that the error message is logged to the console
    expect(console.log).toHaveBeenCalledWith('Invalid credentials');

    // Verify that the error message is displayed in an alert dialog
    expect(window.alert).toHaveBeenCalledWith('Invalid credentials');

    // Verify that the isLogged flag is set to false
    expect(component.isLogged).toBe(false);
  });

  function getCookie(name: string): string | null {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
});
