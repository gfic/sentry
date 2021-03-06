import React from 'react';
import styled from '@emotion/styled';
import {RouteComponentProps} from 'react-router/lib/Router';

import {t} from 'app/locale';
import Alert from 'app/components/alert';
import space from 'app/styles/space';
import ReleaseArtifactsV1 from 'app/views/releases/detail/releaseArtifacts';
import AsyncView from 'app/views/asyncView';
import routeTitleGen from 'app/utils/routeTitle';
import {formatVersion} from 'app/utils/formatters';
import withOrganization from 'app/utils/withOrganization';
import {Organization} from 'app/types';

import {ReleaseContext} from '..';

type RouteParams = {
  orgId: string;
  release: string;
};

type Props = RouteComponentProps<RouteParams, {}> & {
  organization: Organization;
};

class ReleaseArtifacts extends AsyncView<Props> {
  static contextType = ReleaseContext;

  getTitle() {
    const {params, organization} = this.props;
    return routeTitleGen(
      t('Artifacts - Release %s', formatVersion(params.release)),
      organization.slug,
      false
    );
  }

  renderBody() {
    const {project} = this.context;
    const {params, location} = this.props;

    return (
      <ContentBox>
        <Alert type="warning">
          {t(
            'We are working on improving this experience, therefore Artifacts will be moving to Settings soon.'
          )}
        </Alert>

        <ReleaseArtifactsV1
          params={params}
          location={location}
          projectId={project.slug}
          smallEmptyMessage
        />
      </ContentBox>
    );
  }
}

const ContentBox = styled('div')`
  padding: ${space(4)};
  flex: 1;
  background-color: ${p => p.theme.white};
`;

export default withOrganization(ReleaseArtifacts);
