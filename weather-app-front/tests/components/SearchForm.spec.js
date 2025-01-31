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
});
