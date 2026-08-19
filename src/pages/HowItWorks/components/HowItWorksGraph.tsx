import { Divider, Typography } from "@mui/material";
import { graphEdges, graphNodes, getGraphStats } from "../howItWorks.data";
import {
  AlgorithmLayout,
  GraphCanvas,
  GraphLine,
  GraphNode,
  GraphPanel,
  GraphSvg,
  LegendDot,
  LegendItem,
  LegendRow,
  NoteCard,
  NoteIcon,
  NotesGrid,
  StatBox,
  StatsStrip,
} from "../HowItWorks.styles";
import type { HowItWorksCardItem } from "../howItWorks.data";
import { routeCardThemes } from "../../../theme";
import { useI18n } from "../../../i18n/i18nContext";

type Props = {
  algorithmNotes: HowItWorksCardItem[];
};

export function HowItWorksGraph({ algorithmNotes }: Readonly<Props>) {
  const { t } = useI18n();
  const graphStats = getGraphStats(t);

  return (
    <>
      <AlgorithmLayout>
        <GraphPanel>
          <GraphCanvas>
            <GraphSvg viewBox="0 0 760 360" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {graphEdges.map((edge) => {
                const from = graphNodes.find((node) => node.id === edge.from);
                const to = graphNodes.find((node) => node.id === edge.to);

                if (!from || !to) return null;

                return (
                  <GraphLine
                    key={`${edge.from}-${edge.to}`}
                    x1={from.x}
                    y1={from.y}
                    x2={to.x}
                    y2={to.y}
                    data-best={edge.best || undefined}
                  />
                );
              })}
            </GraphSvg>

            {graphNodes.map((node) => (
              <GraphNode
                key={node.id}
                style={{
                  left: `${(node.x / 760) * 100}%`,
                  top: `${(node.y / 360) * 100}%`,
                }}
                data-kind={node.kind}
              >
                <span>{node.id}</span>
                <small>{node.label}</small>
              </GraphNode>
            ))}
          </GraphCanvas>

          <LegendRow>
            <LegendItem>
              <LegendDot data-kind="origin" />
              {t("howItWorks.graphOrigin")}
            </LegendItem>
            <LegendItem>
              <LegendDot data-kind="best" />
              {t("howItWorks.graphBestRoute")}
            </LegendItem>
            <LegendItem>
              <LegendDot data-kind="candidate" />
              {t("howItWorks.graphExploredCity")}
            </LegendItem>
            <LegendItem>
              <LegendDot data-kind="destination" />
              {t("howItWorks.graphDestination")}
            </LegendItem>
          </LegendRow>
        </GraphPanel>

        <NotesGrid>
          {algorithmNotes.map((item, index) => {
            const accent = routeCardThemes[index % routeCardThemes.length];
            return (
              <NoteCard key={item.title}>
                <NoteIcon style={{ color: accent.mainColor, background: accent.bgColor }}>
                  {item.icon}
                </NoteIcon>
                <Typography variant="h6">{item.title}</Typography>
                <Typography color="text.secondary">{item.description}</Typography>
              </NoteCard>
            );
          })}
        </NotesGrid>
      </AlgorithmLayout>

      <StatsStrip>
        {graphStats.map((item, index) => (
          <>
            <StatBox key={item.label}>
              <Typography variant="h4">{item.value}</Typography>
              <Typography color="text.secondary">{item.label}</Typography>
            </StatBox>
            {index < graphStats.length - 1 && <Divider orientation="vertical" flexItem />}
          </>
        ))}
      </StatsStrip>
    </>
  );
}
