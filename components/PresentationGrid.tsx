'use client';

import { BackendPresentation } from '@/utils/presentations';
import { PresentationCard } from '@chtc/web-components';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

function getAllKeywords(presentations: BackendPresentation[]): string[] {
  const keywords: string[] = [];
  presentations.forEach((p) => {
    if (p.keywords) {
      for (const keyword of p.keywords) {
        if (!keywords.includes(keyword)) {
          keywords.push(keyword);
        }
      }
    }
  });
  keywords.sort();
  return keywords;
}

function getAllEvents(presentations: BackendPresentation[]): string[] {
  const events: string[] = [];
  presentations.forEach((p) => {
    if (p.event && !events.includes(p.event)) {
      events.push(p.event);
    }
  });
  presentations.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return events;
}

export function PresentationGrid({
  presentations,
}: {
  presentations: BackendPresentation[];
}) {
  const [eventFilter, setEventFilter] = useState<string>('');
  const [keywordFilter, setKeywordFilter] = useState<string[]>([]);

  // The filtered presentations based on the selected event and keywords
  const [filteredPresentations, setFilteredPresentations] =
    useState(presentations);
  
  useEffect(() => {
    // Rerun filtering when eventFilter or keywordFilter changes
    const newFiltered = presentations.filter((presentation) => {
      const matchesEvent =
        eventFilter === '' || presentation.event === eventFilter;
      const matchesKeywords =
        keywordFilter.length === 0 ||
        keywordFilter.some(
          (keyword) => presentation.keywords?.includes(keyword) ?? false
        );
      return matchesEvent && matchesKeywords;
    });
    // Sort presentations by date, newest first
    newFiltered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    setFilteredPresentations(newFiltered);
  }, [eventFilter, keywordFilter, presentations]);

  const allEvents = getAllEvents(presentations);
  const allKeywords = getAllKeywords(presentations);

  return (
    <Box>
      <Box display='flex' flexDirection='row' ml={3} gap={2}>
        {/* Event selector */}
        <FormControl sx={{ minWidth: '180px' }}>
          <InputLabel id='event-select-label'>Event</InputLabel>
          <Select
            labelId='event-select-label'
            value={eventFilter}
            label='Event'
            onChange={(e) => setEventFilter(e.target.value)}
            sx={{ pb: 0 }}
          >
            {allEvents.map((event) => (
              <MenuItem key={event} value={event}>
                {event}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Keyword selector */}
        <FormControl sx={{ minWidth: '220px' }}>
          <InputLabel id='keyword-select-label'>Keywords</InputLabel>
          <Select
            labelId='keyword-select-label'
            id='keyword-select'
            multiple
            value={keywordFilter}
            label='Keywords'
            onChange={(e) =>
              setKeywordFilter(
                typeof e.target.value === 'string'
                  ? e.target.value.split(',')
                  : e.target.value
              )
            }
            input={<OutlinedInput label='Keywords' />}
            renderValue={(selected) => selected.join(', ')}
            sx={{ pb: 0 }}
          >
            {allKeywords.map((keyword) => (
              <MenuItem key={keyword} value={keyword} sx={{ p: 0, pr: 2 }}>
                <Checkbox checked={keywordFilter.includes(keyword)} />
                <ListItemText
                  primary={keyword}
                  slotProps={{ primary: { pb: 0 } }}
                />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Reset button */}
        {(eventFilter != '' || keywordFilter.length !== 0) && (
          <Box height='100%'>
            <Button
              variant='outlined'
              onClick={() => {
                setEventFilter('');
                setKeywordFilter([]);
              }}
              sx={{ display: 'block' }}
            >
              Reset Filters
            </Button>
          </Box>
        )}
      </Box>

      {/* Presentation grid */}
      <Container maxWidth={'xl'} sx={{ mt: 3 }}>
        <Grid container spacing={1}>
          {filteredPresentations.map((presentation) => (
            <Grid
              key={presentation.slug.join('-')}
              size={{ xs: 12, md: 6, lg: 4 }}
            >
              <PresentationCard
                href={`/presentations/${presentation.slug.join('-')}`}
                presentation={presentation}
                cardSx={{ width: '100%' }}
                maxDescriptionHeight={'4.5em'}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      {filteredPresentations.length === 0 && (
        <Typography variant='body1' textAlign={'center'} py={5}>
          No presentations found.
        </Typography>
      )}
    </Box>
  );
}
