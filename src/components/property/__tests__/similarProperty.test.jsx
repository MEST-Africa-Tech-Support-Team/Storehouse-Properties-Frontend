import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import SimilarProperties from '../similarProperty';
import { propertyService } from '../../../services/propertyService';

describe('SimilarProperties', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and renders similar properties when propertyId is provided', async () => {
    const mockProps = [
      {
        _id: 'sim-1',
        title: 'Mock Similar',
        images: ['https://placehold.co/600x400'],
        location: { city: 'Test City' },
        pricePerNight: 123
      }
    ];

    vi.spyOn(propertyService, 'getSimilarProperties').mockResolvedValue(mockProps);

    render(<SimilarProperties propertyId="697a2431fb5823fab80b23a4" />);

    await waitFor(() => {
      expect(propertyService.getSimilarProperties).toHaveBeenCalledWith('697a2431fb5823fab80b23a4');
    });

    expect(await screen.findByText(/Mock Similar/i)).toBeInTheDocument();
  });

  it('renders fallback items when no propertyId is provided', async () => {
    render(<SimilarProperties />);
    expect(await screen.findByText(/Urban Studio/i)).toBeInTheDocument();
  });
});
