#! /usr/bin/env python

from mrjob.job import MRJob
from mrjob.protocol import JSONValueProtocol


def jaccard(a, b):
    """
    Calculate Jaccard Similarity for 2 vectors
    """
    return float(len(set(a) & set(b))) / len(set(a) | set(b))


class UserSimilarity(MRJob):
    INPUT_PROTOCOL = JSONValueProtocol


    def extract_attack_vector(self, _, record):

        yield record['user_id'], record['business_id']


    def define_user(self, user_id, )
