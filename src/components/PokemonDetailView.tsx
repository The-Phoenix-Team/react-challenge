import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@mui/material';
import useGetPokemonDetail from 'queries/useGetPokemonDetail';
import { PokemonAbilityEffectEntry, PokemonAbilityDetail } from 'types';
import { DEFAULT_LANGUAGE } from 'utils/Constants';
import CustomTableHeader from './CustomTableHeader';
import CustomTableRow from './CustomTableRow';
import CustomTableCell from './CustomTableCell';

interface PokemonDetailViewProps {
  detailUrl: string;
  onBackToListView: () => void;
}

const PokemonDetailView = ({
  detailUrl,
  onBackToListView
}: PokemonDetailViewProps) => {
  const { pokemonDetailData, pokemonAbilitiesData, loading, error } =
    useGetPokemonDetail(detailUrl);

  const findEnglishEffectEntry = (
    effectEntries: PokemonAbilityEffectEntry[]
  ): string => {
    const effect =
      effectEntries.find(
        (effectEntry: PokemonAbilityEffectEntry) =>
          effectEntry.language.name === DEFAULT_LANGUAGE
      ) || effectEntries[0]; // if english is not found, simply return first language entry
    return effect.effect;
  };

  if (loading) {
    return <div>Loading detail data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemonDetailData || !pokemonAbilitiesData) {
    return <div>No data returned for selected pokemon</div>;
  }

  return (
    <Container>
      <Box sx={{ paddingBottom: 2 }}>
        <Typography>{`Selected Pokemon: ${pokemonDetailData.name}`}</Typography>
      </Box>
      <TableContainer>
        <Table>
          <CustomTableHeader>
            <TableRow>
              <TableCell>Ability</TableCell>
              <TableCell>Ability Effect</TableCell>
            </TableRow>
          </CustomTableHeader>
          <TableBody>
            {pokemonAbilitiesData.map((ability: PokemonAbilityDetail) => (
              <CustomTableRow key={ability.name}>
                <CustomTableCell>{ability.name}</CustomTableCell>
                <CustomTableCell>
                  {findEnglishEffectEntry(ability.effect_entries)}
                </CustomTableCell>
              </CustomTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          sx={{ textTransform: 'none' }}
          onClick={() => onBackToListView()}
        >
          Back to list view
        </Button>
      </Box>
    </Container>
  );
};

export default PokemonDetailView;
