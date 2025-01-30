import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
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
});
