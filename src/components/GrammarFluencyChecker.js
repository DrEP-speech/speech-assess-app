import GrammarTips from './GrammarTips';
import GrammarResultExport from './GrammarResultExport';
import ScoreRadarChart from './ScoreRadarChart';

// Inside return JSX
<GrammarTips />
{result && <ScoreRadarChart data={result} />}
{result && <GrammarResultExport result={result} />}
