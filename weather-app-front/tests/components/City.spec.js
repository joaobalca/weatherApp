import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import City from '@/pages/weather/[city].vue';
import { createTestingPinia } from '@pinia/testing';

describe('[city].vue', () => {
  it('displays an error message when fetch fails', () => {
    const wrapper = mount(City, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              weatherStore: {
                error: 'Failed to fetch weather data',
              },
            },
          }),
        ],
        stubs: {
          WeatherViewer: true,
          TodaysWeatherHourly: true,
          NextThreeDays: true,
        },
      },
    });

    expect(wrapper.html()).toContain('Failed to fetch weather data');
  });
  
});
