#! /usr/bin/env python
from __future__ import division
from mrjob.job import MRJob
from itertools import combinations
from sklearn.metrics import jaccard_similarity_score
import numpy as np
# from mrjob.protocol import JSONValueProtocol




class AttackSimilarity(MRJob):
    # INPUT_PROTOCOL = JSONValueProtocol


    def extract_incident(self, _, line):
        record = line.split(',')

        # print record
        if record[0] != 'incident_id':
            feature = record[1:]
            incident = record[0]

            yield incident, list(feature)


    def combine_incident(self, incident, feature):
        allfeatures = list(feature)

        yield incident, list(allfeatures[0])


    def distribute_incident(self, incd, incdfeat):
        yield "all" , [incd, list(incdfeat)]


    def similar_incident(self, _, allincidents):
        for (inc_a, feat_a), (inc_b, feat_b) in combinations(list(allincidents), r=2):

            feat_a_array = np.array(feat_a, dtype='int')
            feat_b_array = np.array(feat_b, dtype='int')


            similarity = jaccard_similarity_score(feat_a_array, feat_b_array)

            # if similarity == 1.0:
            yield [inc_a, inc_b], similarity







    def steps(self):
        """
        MapReduce Steps:

        extract_incident    :   <_, line>  =>  <incident, feature>
        combine_incident    :   <incident, [feature]> => <incident, allfeatures>
        map_incident        :   <incident, [incedentfeatures] => <"all", [[incident, features]]
        reduce_incident     :   <_, allincidents> => <[incident_pairs], similarity>
        """

        return [
            self.mr(mapper=self.extract_incident, reducer=self.combine_incident),
            self.mr(mapper=self.distribute_incident, reducer=self.similar_incident)
        ]








if __name__ == '__main__':
    AttackSimilarity.run();
