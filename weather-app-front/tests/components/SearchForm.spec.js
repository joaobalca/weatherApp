import { mount } from '@vue/test-utils'; 
import { describe, it, expect, vi } from 'vitest';
import SearchForm from '@/components/SearchForm.vue';
import { createTestingPinia } from '@pinia/testing';

describe('SearchForm.vue', () => {
  it('renders the form and inputs', () => {
    const wrapper = mount(SearchForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('button[type="submit"]').exists()).toBe(true);
  });

  it('updates input value when typing', async () => {
    const wrapper = mount(SearchForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const input = wrapper.find('input[type="text"]');
    await input.setValue('Lisbon');

    expect(input.element.value).toBe('Lisbon');
  });

  it('disables the search button if input is empty', () => {
    const wrapper = mount(SearchForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const button = wrapper.find('button[type="submit"]');
    expect(button.attributes('disabled')).toBe('');
  });

  it('enables the search button when input is filled', async () => {
    const wrapper = mount(SearchForm, {
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const input = wrapper.find('input[type="text"]');
    const button = wrapper.find('button[type="submit"]');

    await input.setValue('Lisbon');
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('displays an error message when search fails', async () => {
    const wrapper = mount(SearchForm, {
      global: {
        plugins: [createTestingPinia({
          stubActions: false,
        })],
      },
    });

    // Mock the fetchWeather action to throw an error
    wrapper.vm.weatherStore.fetchWeather = vi.fn(() =>
      Promise.reject({
        response: { _data: { message: 'City not found' } },
      })
    );

    const input = wrapper.find('input[type="text"]');
    const form = wrapper.find('form');

    await input.setValue('InvalidCity');
    await form.trigger('submit.prevent');

    expect(wrapper.find('.text-red-500').exists()).toBe(true);
    expect(wrapper.find('.text-red-500').text()).toBe('City not found');
  });
});
