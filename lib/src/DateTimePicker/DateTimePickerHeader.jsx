import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';
import PickerToolbar from '../_shared/PickerToolbar';
import ToolbarButton from '../_shared/ToolbarButton';
import withUtils from '../_shared/WithUtils';
import * as viewType from '../constants/date-picker-view';

export const DateTimePickerHeader = (props) => {
  const {
    date, classes, openView, meridiemMode, onOpenViewChange, setMeridiemMode,
    theme, utils, ampm, seconds,
  } = props;

  const changeOpenView = view => () => onOpenViewChange(view);

  const rtl = theme.direction === 'rtl';
  const hourMinuteClassName = rtl
    ? classes.hourMinuteLabelReverse
    : classes.hourMinuteLabel;

  return (
    <PickerToolbar className={classes.toolbar}>
      <div className={classes.dateHeader}>
        <ToolbarButton
          variant="subheading"
          onClick={changeOpenView(viewType.YEAR)}
          selected={openView === viewType.YEAR}
          label={utils.getYearText(date)}
        />

        <ToolbarButton
          variant="display1"
          onClick={changeOpenView(viewType.DATE)}
          selected={openView === viewType.DATE}
          label={utils.getDateTimePickerHeaderText(date)}
        />
      </div>

      <div
        className={classnames(classes.timeHeader, {
          [classes.timeHeaderWithSeconds]: seconds,
          [classes.timeHeaderWithoutAmPm]: !ampm,
        })}
      >
        <div className={hourMinuteClassName}>
          <ToolbarButton
            variant={seconds ? 'display1' : 'display2'}
            onClick={changeOpenView(viewType.HOUR)}
            selected={openView === viewType.HOUR}
            label={utils.getHourText(date, ampm)}
          />

          <ToolbarButton
            variant={seconds ? 'display1' : 'display2'}
            label=":"
            selected={false}
            className={classes.separator}
          />

          <ToolbarButton
            variant={seconds ? 'display1' : 'display2'}
            onClick={changeOpenView(viewType.MINUTES)}
            selected={openView === viewType.MINUTES}
            label={utils.getMinuteText(date)}
          />

          {
            seconds &&
              <Fragment>
                <ToolbarButton
                  variant="display1"
                  label=":"
                  selected={false}
                  className={classes.separator}
                />
                <ToolbarButton
                  variant="display1"
                  onClick={changeOpenView(viewType.SECONDS)}
                  selected={openView === viewType.SECONDS}
                  label={utils.getSecondText(date)}
                />
              </Fragment>
          }
        </div>

        {
          ampm &&
            <div
              className={classnames({
                [classes.ampmSelectionWithSeconds]: seconds,
                [classes.ampmSelection]: !seconds,
              })}
            >
              <ToolbarButton
                className={classnames(classes.ampmLabel, {
                  [classes.ampmLabelWithSeconds]: seconds,
                })}
                selected={meridiemMode === 'am'}
                type="subheading"
                label={utils.getMeridiemText('am')}
                onClick={setMeridiemMode('am')}
              />
              {
                seconds &&
                  <ToolbarButton
                    className={classnames(classes.ampmLabel, {
                      [classes.ampmLabelWithSeconds]: seconds,
                    })}
                    label=" / "
                  />
              }
              <ToolbarButton
                className={classnames(classes.ampmLabel, {
                    [classes.ampmLabelWithSeconds]: seconds,
                })}
                selected={meridiemMode === 'pm'}
                type="subheading"
                label={utils.getMeridiemText('pm')}
                onClick={setMeridiemMode('pm')}
              />
            </div>
        }
      </div>
    </PickerToolbar>
  );
};

DateTimePickerHeader.propTypes = {
  date: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  meridiemMode: PropTypes.string.isRequired,
  openView: PropTypes.string.isRequired,
  onOpenViewChange: PropTypes.func.isRequired,
  setMeridiemMode: PropTypes.func.isRequired,
  utils: PropTypes.object.isRequired,
  ampm: PropTypes.bool,
  seconds: PropTypes.bool,
};

DateTimePickerHeader.defaultProps = {
  ampm: true,
  seconds: false,
};

const styles = () => ({
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'space-around',
  },
  separator: {
    margin: '0 4px 0 2px',
    cursor: 'default',
  },
  ampmSelection: {
    marginLeft: 10,
    marginRight: -10,
  },
  ampmSelectionWithSeconds: {
    marginLeft: 3,
    alignSelf: 'flex-start',
  },
  ampmLabel: {
    fontSize: 18,
  },
  ampmLabelWithSeconds: {
    display: 'inline',
  },
  hourMinuteLabel: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  hourMinuteLabelReverse: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row-reverse',
  },
  dateHeader: {
    height: 65,
  },
  timeHeader: {
    height: 65,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  timeHeaderWithSeconds: {
    flexDirection: 'column-reverse',
  },
  timeHeaderWithoutAmPm: {
    justifyContent: 'flex-start',
  },
});

export default withStyles(styles, { withTheme: true })(withUtils()(DateTimePickerHeader));
