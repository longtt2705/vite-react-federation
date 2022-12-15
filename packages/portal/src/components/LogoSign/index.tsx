import {
  Badge,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  useTheme
} from '@mui/material';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: ${theme.palette.text.primary};
        display: flex;
        text-decoration: none;
        width: 53px;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoImage = styled('div')<{ width: number; height: number }>(
  ({ width, height }) => ({
    backgroundImage: 'url("/static/images/icons/pokemon.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    width: width,
    height: height
  })
);

const TooltipWrapper = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    fontSize: theme.typography.pxToRem(12),
    fontWeight: 'bold',
    borderRadius: theme.general.borderRadiusSm,
    boxShadow:
      '0 .2rem .8rem rgba(7,9,25,.18), 0 .08rem .15rem rgba(7,9,25,.15)'
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100]
  }
}));

const Logo: FunctionComponent<{ width?: number; height?: number }> = ({
  width = 240,
  height = 100
}) => {
  const theme = useTheme();

  return (
    <TooltipWrapper title="Pokemon Chess Showdown" arrow>
      <LogoWrapper to="/dashboard/overview">
        <Badge
          sx={{
            '.MuiBadge-badge': {
              fontSize: theme.typography.pxToRem(11),
              right: -2,
              top: 8
            }
          }}
          overlap="circular"
          color="primary"
          badgeContent="1.0"
        >
          <LogoImage width={width} height={height} />
        </Badge>
      </LogoWrapper>
    </TooltipWrapper>
  );
};

export default Logo;
