import { inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NgFlutterStore } from './ng-flutter-store';

describe('NgFlutterStore', () => {
  let store: NgFlutterStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgFlutterStore],
    });
    store = TestBed.runInInjectionContext(() => inject(NgFlutterStore));
  });

  it('should create', () => {
    expect(store).toBeTruthy();
  });

  it('should have default screen of counter', () => {
    expect(store.screen()).toBe('counter');
  });

  it('should have default clicks of 0', () => {
    expect(store.clicks()).toBe(0);
  });

  it('should have default text of empty string', () => {
    expect(store.text()).toBe('');
  });

  it('should update screen via setScreen', () => {
    store.setScreen('text');
    expect(store.screen()).toBe('text');
    store.setScreen('dash');
    expect(store.screen()).toBe('dash');
  });

  it('should update clicks via setClicks', () => {
    store.setClicks(5);
    expect(store.clicks()).toBe(5);
    store.setClicks(100);
    expect(store.clicks()).toBe(100);
  });

  it('should update text via setText', () => {
    store.setText('hello');
    expect(store.text()).toBe('hello');
    store.setText('');
    expect(store.text()).toBe('');
  });

  it('should expose readonly signals', () => {
    expect(typeof store.screen).toBe('function');
    expect(typeof store.clicks).toBe('function');
    expect(typeof store.text).toBe('function');
    store.setScreen('text');
    store.setClicks(3);
    store.setText('test');
    expect(store.screen()).toBe('text');
    expect(store.clicks()).toBe(3);
    expect(store.text()).toBe('test');
  });
});
