#! /usr/bin/env python

from mrjob.job import MRJob
from mrjob.protocol import JSONValueProtocol


def jaccard(a, b):
    """
    Calculate Jaccard Similarity for 2 vectors
    """
    return float(len(set(a) & set(b))) / len(set(a) | set(b))


class attackSimilarity(MRJob):
    INPUT_PROTOCOL = JSONValueProtocol


    def extract_attack_vector(self, _, record):

        yield record['discovery_method'], record['timeline.incident.year']





    def steps(self):
        """
        steps:
        """

        return [self.mr(self.extract_attack_vector)]


if __name__ == '__main__':
    attackSimilarity.run();
