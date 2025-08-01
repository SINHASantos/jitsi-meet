import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { makeStyles } from 'tss-react/mui';

import {
    approveParticipantAudio,
    approveParticipantDesktop,
    approveParticipantVideo,
    rejectParticipantAudio,
    rejectParticipantDesktop,
    rejectParticipantVideo
} from '../../../av-moderation/actions';
import { MEDIA_TYPE } from '../../../base/media/constants';
import Button from '../../../base/ui/components/web/Button';
import { muteRemote } from '../../../video-menu/actions.web';
import { QUICK_ACTION_BUTTON } from '../../constants';

interface IProps {

    /**
     * The translated ask unmute aria label.
     */
    ariaLabel?: boolean;

    /**
     * The translated "ask unmute" text.
     */
    askUnmuteText?: string;

    /**
     * The type of button to be displayed.
     */
    buttonType: string;

    /**
     * Label for mute participant button.
     */
    muteParticipantButtonText?: string;

    /**
     * The ID of the participant.
     */
    participantID: string;

    /**
     * The name of the participant.
     */
    participantName: string;

}

const useStyles = makeStyles()(theme => {
    return {
        button: {
            marginRight: theme.spacing(2)
        }
    };
});

const ParticipantQuickAction = ({
    buttonType,
    participantID,
    participantName
}: IProps) => {
    const { classes: styles } = useStyles();
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const askToUnmute = useCallback(() => {
        dispatch(approveParticipantAudio(participantID));
    }, [ dispatch, participantID ]);

    const allowDesktop = useCallback(() => {
        dispatch(approveParticipantDesktop(participantID));
    }, [ dispatch, participantID ]);

    const allowVideo = useCallback(() => {
        dispatch(approveParticipantVideo(participantID));
    }, [ dispatch, participantID ]);

    const muteAudio = useCallback(() => {
        dispatch(muteRemote(participantID, MEDIA_TYPE.AUDIO));
        dispatch(rejectParticipantAudio(participantID));
    }, [ dispatch, participantID ]);

    const stopDesktop = useCallback(() => {
        dispatch(muteRemote(participantID, MEDIA_TYPE.SCREENSHARE));
        dispatch(rejectParticipantDesktop(participantID));
    }, [ dispatch, participantID ]);

    const stopVideo = useCallback(() => {
        dispatch(muteRemote(participantID, MEDIA_TYPE.VIDEO));
        dispatch(rejectParticipantVideo(participantID));
    }, [ dispatch, participantID ]);

    switch (buttonType) {
    case QUICK_ACTION_BUTTON.MUTE: {
        return (
            <Button
                accessibilityLabel = { `${t('participantsPane.actions.mute')} ${participantName}` }
                className = { styles.button }
                label = { t('participantsPane.actions.mute') }
                onClick = { muteAudio }
                size = 'small'
                testId = { `mute-audio-${participantID}` } />
        );
    }
    case QUICK_ACTION_BUTTON.ASK_TO_UNMUTE: {
        return (
            <Button
                accessibilityLabel = { `${t('participantsPane.actions.askUnmute')} ${participantName}` }
                className = { styles.button }
                label = { t('participantsPane.actions.askUnmute') }
                onClick = { askToUnmute }
                size = 'small'
                testId = { `unmute-audio-${participantID}` } />
        );
    }
    case QUICK_ACTION_BUTTON.ALLOW_DESKTOP: {
        return (
            <Button
                accessibilityLabel = { `${t('participantsPane.actions.askDesktop')} ${participantName}` }
                className = { styles.button }
                label = { t('participantsPane.actions.allowDesktop') }
                onClick = { allowDesktop }
                size = 'small'
                testId = { `unmute-desktop-${participantID}` } />
        );
    }
    case QUICK_ACTION_BUTTON.ALLOW_VIDEO: {
        return (
            <Button
                accessibilityLabel = { `${t('participantsPane.actions.askUnmute')} ${participantName}` }
                className = { styles.button }
                label = { t('participantsPane.actions.allowVideo') }
                onClick = { allowVideo }
                size = 'small'
                testId = { `unmute-video-${participantID}` } />
        );
    }
    case QUICK_ACTION_BUTTON.STOP_DESKTOP: {
        return (
            <Button
                accessibilityLabel = { `${t('participantsPane.actions.stopDesktop')} ${participantName}` }
                className = { styles.button }
                label = { t('participantsPane.actions.stopDesktop') }
                onClick = { stopDesktop }
                size = 'small'
                testId = { `mute-desktop-${participantID}` } />
        );
    }
    case QUICK_ACTION_BUTTON.STOP_VIDEO: {
        return (
            <Button
                accessibilityLabel = { `${t('participantsPane.actions.mute')} ${participantName}` }
                className = { styles.button }
                label = { t('participantsPane.actions.stopVideo') }
                onClick = { stopVideo }
                size = 'small'
                testId = { `mute-video-${participantID}` } />
        );
    }
    default: {
        return null;
    }
    }
};

export default ParticipantQuickAction;
